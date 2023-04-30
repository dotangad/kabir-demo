import { Box, Heading } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Kabir&apos;s Recipe App</title>
        <meta name="description" content="berkeley classes are retarded" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Heading>Kabir&apos;s Recipe App</Heading>
      </Box>
    </>
  );
};

export default Home;
