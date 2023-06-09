import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  List,
  ListItem,
  Text,
  Textarea,
  UnorderedList,
  Link as CLink,
} from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { api } from "~/utils/api";

const Recipe: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { id } = router.query;
  const recipeQ = api.recipe.recipe.useQuery(
    { id: id as string },
    { enabled: !!id }
  );
  const deleteM = api.recipe.delete.useMutation({
    onSuccess: () => {
      router.push("/");
    },
  });

  return (
    <>
      <Head>
        <title>Kabir&apos;s Recipe App</title>
        <meta name="description" content="berkeley classes are retarded" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box w="100%" p={10}>
        <Heading>Kabir&apos;s Recipe App</Heading>

        <Box my={10} mx={"auto"} maxW="lg">
          <Heading fontSize="2xl">{recipeQ.data?.name}</Heading>
          <Text fontFamily={"monospace"}>{recipeQ.data?.id}</Text>

          <Box my={6}>
            <Heading fontSize="lg">Ingredients</Heading>
            <UnorderedList mt={2}>
              {recipeQ.data?.ingredients.map(({ qty, unit, ingredient }, i) => (
                <ListItem key={i}>
                  {qty} {unit} of {ingredient}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>

          <Box my={6}>
            <Heading fontSize="lg">Instructions</Heading>
            <Box as="pre" whiteSpace={"pre-wrap"}>
              {recipeQ.data?.instructions}
            </Box>
          </Box>

          <Box my={6}>
            <Heading fontSize="lg">Related Recipes</Heading>
            <UnorderedList mt={2}>
              {/* @ts-ignore */}
              {recipeQ.data?.relatedRecipes.map((recipe, i) => (
                <ListItem key={i}>
                  <CLink
                    as={Link}
                    href={`/recipe/${recipe.recipe.id}`}
                    color="blue.400"
                  >
                    {recipe.recipe.name}
                  </CLink>
                </ListItem>
              ))}
              {/* @ts-ignore */}
              {recipeQ.data?.recipesRelatedTo.map((recipe, i) => (
                <ListItem key={i}>
                  <CLink
                    as={Link}
                    href={`/recipe/${recipe.related?.id}`}
                    color="blue.400"
                  >
                    {recipe.related?.name}
                  </CLink>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>

          <Box>
            <Button
              colorScheme="red"
              onClick={() => deleteM.mutate({ id: id as string })}
              isDisabled={deleteM.isLoading}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Recipe;
