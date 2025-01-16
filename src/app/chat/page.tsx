"use client";

import { useUser } from "@/components/getUserData";
import IChat from "@/models/IChat";
import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";

export default function Page() {
  const { user } = useUser();
  
  const [chats, setChats] = React.useState<IChat[]>();
  const buyChats: IChat[] = chats?.filter(chat => chat.buyer.id === user?.id) || [];
  const sellChats: IChat[] = chats?.filter(chat => chat.seller.id === user?.id) || [];
  
  React.useEffect(() => {

  }, []);

  return (
    <SimpleGrid>
      <Box>

      </Box>
      <Box>
        
      </Box>
    </SimpleGrid>
  )
}
