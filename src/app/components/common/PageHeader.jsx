import './page-header.css';

export default function PageHeader({
    title,
    subtitle,
    backgroundImage,
    breadcrumbs
}) {
    return (
        <section className="page-header">
            <div className="page-header-overlay"></div>
            <div className="page-header-bg"></div>
            <div className="page-header-content">
                <div className="container">
                    {breadcrumbs && (
                        <div className="breadcrumbs">
                            <a href="/">Главная</a>
                            <span>/</span>
                            <span className="current">{breadcrumbs}</span>
                        </div>
                    )}
                    <h1 className="page-header-title">{title}</h1>
                    <p className="page-header-subtitle">{subtitle}</p>
                </div>
            </div>
        </section>
    );
}