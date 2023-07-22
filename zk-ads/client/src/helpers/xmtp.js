
import { Client } from '@xmtp/xmtp-js';
import { providers } from 'ethers';

export const handleRatingChange = async (newValue) => {
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const xmtp = await Client.create(signer, { env: "dev" })
    console.log("Client created", xmtp);
    const conversation = await xmtp.conversations.newConversation(
      '0x67AD341F23913FC3c9041F1850dE466893531053'
    )
    
    const msg = {'from': await signer.getAddress(),
                'ad_id': 'placeholder',
                'rating': newValue};
    const message = await conversation.send(JSON.stringify(msg));
    console.log('sent', message);
  };
