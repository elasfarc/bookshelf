import { QueryClient } from "react-query";
import { toaster } from "baseui/toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onSettled: (data, error, variables) => {
        if (error) toaster.negative(error.message ?? error);
        else toaster.positive("Successfully updated");
      },
    },
  },
});

export default queryClient;
