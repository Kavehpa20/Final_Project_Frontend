// "use client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactNode } from "react";

// import {
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   createContext,
//   useContext,
//   useState,
// } from "react";
// interface IKaveh {
//   hi: string;
//   setHi: Dispatch<SetStateAction<string>>;
// }
// const kavehPanelContext = createContext<IKaveh | null>(null);

// const ContextProvider = ({ children }: { children: ReactNode }) => {
//   const [hi, setHi] = useState("hi");
//   <kavehPanelContext.Provider value={{ hi, setHi }}>
//     {children}
//   </kavehPanelContext.Provider>;
// };

// const useKaveh = () => useContext(kavehPanelContext);

// export { useContext, ContextProvider };

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: false,
//       staleTime: 1000 * 60 * 5,
//       gcTime: 1000 * 60 * 6,
//     },
//   },
// });

// const QueryProvider = ({ children }: { children: ReactNode }) => {
//   return (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// };

// export default QueryProvider;
