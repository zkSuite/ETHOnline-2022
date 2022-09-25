const { h2d, bigint_to_tuple, fillArray } = require('./index');

const generate = async (pKey, whitelisted, formId) => {
  const privateKeyDecimal = h2d(pKey);
  const priv_tuple = bigint_to_tuple(BigInt(privateKeyDecimal));

  const inputs = {
    privateKey: priv_tuple,
    whitelisted: fillArray(
      whitelisted.map((addr) => h2d(addr.slice(2))),
      10,
      '0x0000000000000000000000000000000000000000'
    ),
    formId: formId,
  };

  console.log('**** GENERATING PROOF ****');

  try {
    const start = new Date().getTime();
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      inputs,
      'https://dx9qacyqak197.cloudfront.net/circuit.wasm',
      'https://dx9qacyqak197.cloudfront.net/circuit.zkey'
    );
    const end = new Date().getTime();
    const time = end - start;
    console.log('**** PROOF GENERATED IN ', time, ' ****');

    const vkey = await fetch('/verification_key.json').then(function (res) {
      return res.json();
    });

    console.log('**** VERIFYING PROOF ****');
    const res = await snarkjs.groth16.verify(vkey, publicSignals, proof);

    if (res === true) {
      console.log('✅ Verification OK');
    } else {
      console.log('❌ Invalid proof');
    }

    console.log('**** EXPORTING SOLIDITY CALLDATA ****');

    const calldata = await snarkjs.groth16.exportSolidityCallData(
      proof,
      publicSignals
    );

    const argv = calldata.replace(/["[\]\s]/g, '').split(',');

    const a = [argv[0], argv[1]];
    const b = [
      [argv[2], argv[3]],
      [argv[4], argv[5]],
    ];
    const c = [argv[6], argv[7]];
    const input = [];

    for (let i = 8; i < argv.length; i++) {
      input.push(argv[i]);
    }

    return { a, b, c, input };
  } catch (error) {
    alert('You are not allowed to fill this form');
    console.error(error);
    return null;
  }
};

module.exports = { generate };
