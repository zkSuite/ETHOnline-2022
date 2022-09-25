import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useAccount, useContract, useProvider, useSigner } from 'wagmi';

import Modal from '../../modal';
import { generate } from '../../../utils/generate';
import FormsABI from '../../../abis/forms.json';

const ProofModal = ({
  isOpen,
  restricted,
  formId,
  isSubmitting,
  setIsProofValid,
  setIsOpen,
  setIsSubmitting,
}: {
  isOpen: boolean;
  restricted: string[];
  formId: string;
  isSubmitting: boolean;
  setIsProofValid: (isProof: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
}) => {
  const [pKey, setPKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [proof, setProof] = useState('');

  const signer = useSigner();
  const provider = useProvider();
  const { address } = useAccount();

  const contract = useContract({
    addressOrName: '0xe4D3fbDeE7a1d587aA7aF5ed32F9c4BF1e16d60e',
    contractInterface: FormsABI,
    signerOrProvider: signer.data,
  });

  const submitProof = async () => {
    if (!proof) {
      toast.error('Either enter your proof or generate one');
      return;
    }
    setIsSubmitting(true);
    try {
      const parsedProof = JSON.parse(proof);
      const gasLimit = await contract.estimateGas.submit(
        parsedProof.a,
        parsedProof.b,
        parsedProof.c,
        parsedProof.input,
        `${formId}-${address}`
      );

      const gasPrice = await provider.getFeeData();
      const tx = await contract.submit(
        parsedProof.a,
        parsedProof.b,
        parsedProof.c,
        parsedProof.input,
        `${formId}-${address}`,
        {
          gasLimit: gasLimit.toString(),
          gasPrice: gasPrice.maxFeePerGas!.toString(),
        }
      );
      const receipt = await tx.wait();
      console.log(receipt);
      setIsSubmitting(false);
      setIsProofValid(true);

      toast.success('Successfully submitted the proof');
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
      toast.error('Invalid Proof');
    }
  };

  const generateProof = async () => {
    if (!pKey || pKey.length !== 64) {
      toast.error('Please enter valid private key');
      return;
    }
    setIsGenerating(true);
    try {
      const generatedProof = await generate(pKey, restricted, formId);
      const stringified_proof = JSON.stringify(generatedProof);

      setProof(stringified_proof);
      setPKey('');
      setIsGenerating(false);
    } catch (error) {
      setIsGenerating(false);
      console.error(error);
      toast.error('Some error occured. Please refresh the page');
    }
  };
  return (
    <Modal
      title="Generate Proof"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={() => {}}
      customBtn={
        <button
          className="btn bg-purple-700 hover:bg-purple-600 text-white"
          disabled={isSubmitting || !proof}
          onClick={submitProof}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Proof'}
        </button>
      }
    >
      <div className="p-5">
        <p className="font-medium">
          Submit Proof{' '}
          <span className="text-xs text-gray-400">
            (Generate proof locally from{' '}
            <Link href="https://github.com/zkSuite/zkforms-cli">
              <a className="hover:underline">here</a>
            </Link>
            )
          </span>
        </p>

        <div className="mt-4">
          <textarea
            placeholder="Your proof"
            className="input"
            value={proof}
            onChange={(e) => setProof(e.target.value)}
          />
        </div>

        <p className="text-xs text-center font-normal my-5 text-gray-500">
          --------- OR ---------
        </p>

        <p className="font-medium">Generate Proof</p>

        <div className="mt-4 flex items-center">
          <input
            placeholder="Enter your private key"
            className="input"
            value={pKey}
            onChange={(e) => setPKey(e.target.value)}
          />
          <button
            className="btn bg-purple-700 text-white"
            disabled={isGenerating}
            onClick={generateProof}
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProofModal;
