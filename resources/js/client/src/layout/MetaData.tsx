import Helmet from "react-helmet";

interface MetaDataProps {
    title: string;
    description: string;
    keywords: string;
}

export default function MetaData({
    title,
    description,
    keywords,
}: MetaDataProps) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    );
}
