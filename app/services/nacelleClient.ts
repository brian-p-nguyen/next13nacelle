import { StorefrontClient } from '@nacelle/storefront-sdk';

const nacelleClient = new StorefrontClient({
  storefrontEndpoint: process.env
    .NEXT_PUBLIC_NACELLE_STOREFRONT_ENDPOINT as string,
});

export default nacelleClient
