import {
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import usePlatziPunks from "../../hooks/usePlatziPunks";
import { useCallback, useEffect, useState } from "react";
import useTruncatedAddress from "../../hooks/useTruncatedAddress";

const Home = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [nextId, setNextId] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const { active, account, library } = useWeb3React();
  const platziPunks = usePlatziPunks();
  const toast = useToast();

  const getPlatziPunksData = useCallback(async () => {
    if (platziPunks) {
      const totalSupply = await platziPunks.methods.totalSupply().call();
      const dnaPreview = await platziPunks.methods
        ._generateDNA(totalSupply, account)
        .call();
      const image = await platziPunks.methods.imageByDNA(dnaPreview).call();
      setImageSrc(image);
      setNextId(totalSupply);
    }
  }, [platziPunks, account]);

  const mintPlatziPunk = () => {
    setIsMinting(true);

    platziPunks.methods
      .mint()
      .send({ from: account, value: library.utils.toWei('0.01')})
      .on('transactionHash', (txnHash) => {
        toast({
          title: 'Transacción enviada',
          description: txnHash,
          status: 'info'
        });
      })
      .on('receipt', () => {
        setIsMinting(false);
        toast({
          title: 'Transacción confirmada',
          description: 'Nunca pares de aprender',
          status: 'success'
        });
      })
      .on('error', (error) => {
        setIsMinting(false);
        toast({
          title: 'Transacción fallida',
          description: error.message,
          status: 'error'
        });
      });
  }

  useEffect(() => {
    getPlatziPunksData();
  }, [getPlatziPunksData ]);

  const truncatedAddress = useTruncatedAddress(account);

  return (
    <Stack
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
        >
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "green.400",
              zIndex: -1,
            }}
          >
            Un Platzi Punk
          </Text>
          <br />
          <Text as={"span"} color={"green.400"}>
            nunca para de aprender
          </Text>
        </Heading>
        <Text color={"gray.500"}>
          Platzi Punks es una colección de Avatares randomizados cuya metadata
          es almacenada on-chain. Poseen características únicas y sólo hay 10000
          en existencia.
        </Text>
        <Text color={"green.500"}>
          Cada Platzi Punk se genera de forma secuencial basado en tu address,
          usa el previsualizador para averiguar cuál sería tu Platzi Punk si
          minteas en este momento
        </Text>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: "column", sm: "row" }}
        >
          <Button
            onClick={mintPlatziPunk}
            rounded={"full"}
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            colorScheme={"green"}
            bg={"green.400"}
            _hover={{ bg: "green.500" }}
            disabled={!platziPunks}
            isLoading={isMinting}
          >
            Obtén tu punk
          </Button>
          <Link to="/punks">
            <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
              Galería
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Flex
        flex={1}
        direction="column"
        justify={"center"}
        align={"center"}
        position={"relative"}
        w={"full"}
      >
        <Image src={active ? imageSrc : "https://avataaars.io/"} />
        {active ? (
          <>
            <Flex mt={2}>
              <Badge>
                Next ID:
                <Badge ml={1} colorScheme="green">
                  {nextId}
                </Badge>
              </Badge>
              <Badge ml={2}>
                Address:
                <Badge ml={1} colorScheme="green">
                  { active ? truncatedAddress : "0x0000...0000" }
                </Badge>
              </Badge>
            </Flex>
            <Button
              onClick={getPlatziPunksData}
              mt={4}
              size="xs"
              colorScheme="green"
            >
              Actualizar
            </Button>
          </>
        ) : (
          <Badge mt={2}>Wallet desconectado</Badge>
        )}
      </Flex>
    </Stack>
  );
};

export default Home;