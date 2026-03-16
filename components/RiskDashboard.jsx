import { useEffect, useState } from 'react';

const RiskDashboard = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
    }, []);

    return <div className="p-4 text-white">Dashboard Width: {width}px</div>;
};
