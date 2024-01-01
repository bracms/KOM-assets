import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'

import {createSignerFromKeypair, generateSigner, keypairIdentity, percentAmount, signerIdentity} from '@metaplex-foundation/umi'
import {createNft, fetchDigitalAsset, mplTokenMetadata,} from '@metaplex-foundation/mpl-token-metadata'


const umi = createUmi('https://api.devnet.solana.com').use(mplTokenMetadata())
const myKeypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array([2,203,17,17,255,114,29,61,166,217,150,144,241,102,36,73,30,56,121,151,36,194,120,24,52,87,208,30,187,205,164,214,64,219,118,133,58,241,19,101,209,185,88,0,73,199,78,153,62,112,141,67,110,145,223,241,167,219,9,203,212,96,98,189]));

const myKeypairSigner = createSignerFromKeypair('eddsa', myKeypair);


umi.use(keypairIdentity(myKeypairSigner))


const mint = generateSigner(umi)
await createNft(umi, {
    mint,
    name: 'My NFT',
    uri: 'https://example.com/my-nft.json',
    sellerFeeBasisPoints: percentAmount(5.5),
}).sendAndConfirm(umi)

const asset = await fetchDigitalAsset(umi, mint.publicKey)