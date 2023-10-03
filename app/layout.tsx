import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

import { store } from "@/redux/store";
import { Provider } from "react-redux";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "sisCord - Discord clone",
	description: "Generated by create next app"
};

export default function RootLayout({ children }: {
	children: React.ReactNode;
}) {
	return (
		<Provider store={store}>
			<ClerkProvider>
				<html lang="en" suppressHydrationWarning>
				<body className={cn(
					font.className,
					"bg-white dark:bg-[#313338]"
				)}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem={false}
					storageKey="theme"
				>
					{children}
				</ThemeProvider>
				</body>
				</html>
			</ClerkProvider>
		</Provider>
	);
}
