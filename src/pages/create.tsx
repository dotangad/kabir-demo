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
  Textarea,
} from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { api } from "~/utils/api";

const Create: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const createRecipeM = api.recipe.create.useMutation({
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push("/");
    },
  });

  const onSubmit = handleSubmit((data) => {
    createRecipeM.mutate({
      name: data.name as string,
      instructions: data.instructions as string,
      related: data.related
        .split(",")
        .map((x: string) => x.trim())
        .filter((x: string) => x !== "") as string[],
    });
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

        <Flex
          as="form"
          flexDir="column"
          maxW="lg"
          mx="auto"
          my={6}
          rowGap={3}
          onSubmit={onSubmit}
        >
          <Heading fontSize="xl">Create Recipe</Heading>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Cheese Sandwich"
              {...register("name", { required: true })}
            />
            <FormErrorMessage>
              {errors.name?.message as string}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.instructions}>
            <FormLabel>Instructions</FormLabel>
            <Textarea
              placeholder="2 pieces bread"
              {...register("instructions", { required: true })}
            />
            <FormErrorMessage>
              {errors.instructions?.message as string}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.related}>
            <FormLabel>Related IDs (comma separated)</FormLabel>
            <Input
              type="text"
              placeholder="kjdlkjfsd23hdfjg, jhakjdhdkbf12"
              {...register("related", { required: true })}
            />
            <FormErrorMessage>
              {errors.related?.message as string}
            </FormErrorMessage>
          </FormControl>

          <Box>
            <Button type="submit" colorScheme="pink">
              Create Recipe
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Create;
