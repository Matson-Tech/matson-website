import { toast } from "@/hooks/use-toast";

const confirmationMessage = (event: string) => {
    toast({
        title: `Successfully updated ${event}`,
    });
};

export default confirmationMessage;
