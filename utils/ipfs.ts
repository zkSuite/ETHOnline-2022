import { Web3Storage } from 'web3.storage';

function getAccessToken() {
  return process.env.NEXT_PUBLIC_WEB3_STORAGE!;
}

export function makeGatewayURL(cid: string, path: string) {
  return `https://cloudflare-ipfs.com/ipfs/${cid}/${encodeURIComponent(path)}`;
}

export function jsonFile(filename: string, obj: any) {
  return new File([JSON.stringify(obj)], filename);
}

export async function storeFile(details: {
  title: string;
  description: string;
  data: any;
  imageFile: File;
  owner: string;
  timestamp: number;
  deadline: string;
  restricted: string | null;
}) {
  // @ts-ignore
  const client = new Web3Storage({ token: getAccessToken() });

  const uploadName = [details.owner, details.title, details.timestamp].join(
    '-'
  );

  const metadataFile = jsonFile('metadata.json', {
    path: details.imageFile?.name ?? '',
    title: details.title,
    description: details.description,
    data: details.data,
    owner: details.owner,
    timestamp: details.timestamp,
    deadline: details.deadline,
    restricted: details.restricted,
    isCompleted: false,
  });

  const files = details.imageFile
    ? [details.imageFile, metadataFile]
    : [metadataFile];

  const onRootCidReady = (cid: string) => {
    console.log('uploading files with cid:', cid);
  };

  const totalSize = files.map((f) => f.size).reduce((a, b) => a + b, 0);
  let uploaded = 0;

  const onStoredChunk = (size: number) => {
    uploaded += size;
    const pct = 100 * (uploaded / totalSize);
    console.log(`Uploading... ${pct.toFixed(2)}% complete`);
  };

  const cid = await client.put(files, {
    name: uploadName,
    onRootCidReady,
    onStoredChunk,
  });

  const metadataGatewayURL = makeGatewayURL(cid, 'metadata.json');
  let imageGatewayURL = '';
  if (details.imageFile)
    imageGatewayURL = makeGatewayURL(cid, details.imageFile.name);

  return { cid, metadataGatewayURL, imageGatewayURL };
}

export async function listFiles(owner: string) {
  const details = [];
  const token = getAccessToken();
  if (!token) {
    console.error('No API token for Web3.Storage found.');
    return;
  }
  // @ts-ignore
  const client = new Web3Storage({ token });
  for await (const upload of client.list()) {
    if (!upload.name || !upload.name.startsWith(owner)) {
      continue;
    }

    try {
      const metadata = await getMetadata(upload.cid);
      details.push(metadata);
    } catch (e) {
      console.error('error getting image metadata:', e);
      continue;
    }
  }
  return details;
}

export async function fetchAnalytics(cid: string) {
  const details = [];
  const token = getAccessToken();
  if (!token) {
    console.error('No API token for Web3.Storage found.');
    return;
  }
  // @ts-ignore
  const client = new Web3Storage({ token });

  const metadata = await getMetadata(cid);

  for await (const upload of client.list()) {
    if (
      !upload.name ||
      !upload.name.startsWith(
        `response-${metadata.owner}-${metadata.title}-${metadata.timestamp}`
      )
    ) {
      continue;
    }

    try {
      const resMetadata = await getMetadata(upload.cid);
      details.push(resMetadata);
    } catch (e) {
      console.error('error getting response metadata:', e);
      continue;
    }
  }
  return { details, metadata };
}

export async function getMetadata(cid: string) {
  const url = makeGatewayURL(cid, 'metadata.json');
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `error fetching image metadata: [${res.status}] ${res.statusText}`
    );
  }
  const metadata = await res.json();
  const gatewayURL = makeGatewayURL(cid, metadata.path);
  const uri = `ipfs://${cid}/${metadata.path}`;
  return { ...metadata, cid, gatewayURL, uri };
}

export async function storeResponse(details: {
  form: string;
  data: any;
  user: string | null;
  timestamp: number;
}) {
  // @ts-ignore
  const client = new Web3Storage({ token: getAccessToken() });

  const uploadName = ['response', details.form, details.user].join('-');

  const metadataFile = jsonFile('metadata.json', {
    form: details.form,
    data: details.data,
    user: details.user ?? null,
    timestamp: details.timestamp,
  });

  const files = [metadataFile];

  const onRootCidReady = (cid: string) => {
    console.log('uploading files with cid:', cid);
  };

  const totalSize = files.map((f) => f.size).reduce((a, b) => a + b, 0);
  let uploaded = 0;

  const onStoredChunk = (size: number) => {
    uploaded += size;
    const pct = 100 * (uploaded / totalSize);
    console.log(`Uploading... ${pct.toFixed(2)}% complete`);
  };

  const cid = await client.put(files, {
    name: uploadName,
    onRootCidReady,
    onStoredChunk,
  });

  const metadataGatewayURL = makeGatewayURL(cid, 'metadata.json');

  return { cid, metadataGatewayURL };
}
