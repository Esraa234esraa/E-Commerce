// import React, { useRef } from 'react';
// import Section from './Section';

// export default function Parent() {
//     const sectionRef = useRef(null);

//     const scrollToSection = () => {
//         sectionRef.current.scrollIntoView({ behavior: 'smooth' });
//     };

//     return (
//         <div>
//             <button onClick={scrollToSection}>Scroll to Section</button>

//             <div style={{ height: '100vh' }}>Some content before the section...</div>

//             <Section ref={sectionRef}>This is the section to scroll to!</Section>

//             <div style={{ height: '100vh' }}>More content after the section...</div>
//         </div>
//     );
// }
