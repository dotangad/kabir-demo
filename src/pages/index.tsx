import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  UnorderedList,
  Link as CLink,
} from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const recipesQ = api.recipe.recipes.useQuery();

  return (
    <>
      <Head>
        <title>Kabir&apos;s Recipe App</title>
        <meta name="description" content="berkeley classes are retarded" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box p={10}>
        <Heading>Kabir&apos;s Recipe App</Heading>

        <Box my={6}>
          <Button as={Link} href="/create" colorScheme="pink">
            Create Recipe
          </Button>
        </Box>

        <Heading fontSize="2xl" mt={6} mb={2}>
          Your recipes
        </Heading>
        <UnorderedList>
          {recipesQ.data?.recipes.map((recipe, i) => (
            <ListItem key={i}>
              <CLink as={Link} href={`/recipe/${recipe.id}`} color="blue.400">
                {recipe.name}
              </CLink>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </>
  );
};

export default Home;
