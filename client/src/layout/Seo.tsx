import Helmet from "react-helmet";

interface SeoProps {
    title: string;
    description: string;
    keywords: string;
    iconUrl: string;
}

export default function Seo({
    title,
    description,
    keywords,
    iconUrl,
}: SeoProps) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            {iconUrl && <link rel="icon" href={iconUrl} type="image/svg+xml" />}
        </Helmet>
    );
}
