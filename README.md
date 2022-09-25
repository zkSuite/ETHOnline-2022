<div align="center">
  <img src="https://github.com/zkSuite/zkforms-frontend/blob/main/public/static/logo.png" alt="Logo" width="350" height="100">
  
  <h3 align="center">zkForms</h3>

  <p align="center">
zkForms is a web3-focused form builder to construct online forms and surveys with multiple question formats, restrictions and better analysis that can be accessed from any device, anytime, and anywhere.
  </p>
    <br />
    <a href="https://zkforms.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/zkSuite/zkforms-frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/zkSuite/zkforms-frontend/issues">Request Feature</a>
  </p>
</div>
  
## About The Project
An open source interface for zkForms -- a platform to easily create and share online forms in a censorship resistant decentralized environment

## How it's Made

To save form data, responses and analytics, zkForms leverages Filecoin and IPFS in the background. We used the Web3.Storage to store the necessary data and polygon network to host the smart contracts.

To create the frontend which includes form builder, form renderer, and data viewer, we used React, Next.js, TailwindCSS, and RainbowKit.

In order to provide Zero-Knowledge Proofs that demonstrate the user's membership in the DAO, zkForms also makes use of SnarkJS and Circom2.0.

You can also generate proofs locally and submit on the client using the zkForms cli tool: [https://github.com/zkSuite/zkforms-cli](https://github.com/zkSuite/zkforms-cli)

zkForms also uses the AWS S3 to host the static files like circuit.wasm and circuit.zkey used in generating the Zero Knowledge Proofs and AWS Cloudfront to speed up the distribution of static files to the users.

All the smart contracts and circom circuits are available at: [https://github.com/zkSuite/zkForms-core](https://github.com/zkSuite/zkForms-core)

Check it out here: [https://zkforms.vercel.app/](https://zkforms.vercel.app/)

## Contracts

Verifier => 0x0fc5359c4620F46C8159C3614CA1785997AC6aab<br/>
zkForms => 0xe4D3fbDeE7a1d587aA7aF5ed32F9c4BF1e16d60e

## Supported Wallets

<ul>
  <li>Metamask</li>
  <li>Sequence</li>
  <li>WalletConnect</li>
  <li>Coinbase</li>
  <li>Rainbow</li>
</ul>

## Accessing the zkForms Interface

To access the zkForms Interface, use an IPFS gateway link from the latest release, or visit [zkforms.vercel.app](https://zkforms.vercel.app/)

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## What's Next

zkForms currently supports the feature to prove the membership of the user in the DAO but in the next iteration of zkForms, we are going to add restrictions based on tokens and NFTs. Therefore, soon users can be restrcited to fill the form/survey only if they hold a token/NFT for a predetermined period of time.
