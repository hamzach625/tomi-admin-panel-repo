import { create } from "ipfs-http-client";
const client = create("https://ipfs.infura.io:5001/api/v0");
// export const IpfsStorage = async (file) => {
//   try {
//     const added = await client.add(file);
//     const url = `https://ipfs.infura.io/ipfs/${added.path}`;
//     return url;
//   } catch (error) {
//     console.log("Error uploading file: ", error);
//   }
// };

export const IpfsStorage = async (file) => {
  try {
    const addImage = await client.add(file)
    const imageUrl = `ipfs://${addImage.path}`;
    // const imageUrl = `https://ipfs.infura.io/ipfs/${addImage.path}`;
    return imageUrl;
  } catch (error) {
    console.log('Error uploading file: ', error)
  }
}
