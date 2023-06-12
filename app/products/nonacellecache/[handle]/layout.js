import "../../../globals.css";
import Layout from "@/app/components/Layout/Layout";
import contentfulClient from "@/app/services/contentfulClient";

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

function transformHeader(headerContent) {
	headerContent.fields.navigation = headerContent.fields.navigation.map((nav) => {
		return {
			...nav,
			type: nav.sys.contentType.sys.id
		}
	})

	return headerContent
}

async function getContentfulLayout() {
    let header = await contentfulClient.getEntries({
		content_type: 'componentHeader',
		'fields.handle[like]': 'component-header',
		include: 3
	})

	header = transformHeader(header.items[0])

    const newsletter = await contentfulClient.getEntries({
		content_type: 'componentNewsletter',
		'fields.handle[like]': 'component-newsletter',
		include: 2
	})

    const footer = await contentfulClient.getEntries({
		content_type: 'componentFooter',
		'fields.handle[like]': 'component-footer',
		include: 2
	})

	return {
		header: [header],
		newsletter: [newsletter.items[0]],
		footer: [footer.items[0]]
	}
}

export default async function RootLayout({ children }) {
	const layoutContent = await getContentfulLayout();

	return (
		<html lang="en">
		<body>
			<Layout components={layoutContent}>
				{children}
			</Layout>
		</body>
		</html>
	);
}
