export type Contributor = {
  name: string;
  origin: string;
  image: string;
  socials: {
    name: string;
    url: string;
  }[];
};

export type Provider = {
  [key: string]: {
    callbackUrl: string;
    id: string;
    name: string;
    signinUrl: string;
    type: string;
  };
};
