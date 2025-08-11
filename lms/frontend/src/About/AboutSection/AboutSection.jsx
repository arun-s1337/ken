// import AboutCard from './AboutCard';
// import {
//   trainingData,
//   affiliationsData,
//   licensesData,
//   educationData,
//   certificationsData,
// } from '../../utils/Links';

// export default function AboutSection() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-6">
//       <div>
//         <AboutCard
//         title="Professional Training"
//         items={trainingData}
//         className="w-full"/>
//          <AboutCard
//         title="Board Certifications"
//         items={certificationsData}
//         className="w-full my-5"/>
//       </div>
      
//       <div>
//         <AboutCard
//           title="Professional Affiliations"
//           items={affiliationsData}
//           className="w-full"/>
//          <AboutCard
//         title="Medical Licenses"
//         items={licensesData}
//         className="w-full my-5"/>
//          <AboutCard
//         title="Education"
//         items={educationData}
//         className="w-full"/>
//       </div>
    


   
//     </div>
//   );
// }

import AboutCard from './AboutCard';
import {
  trainingData,
  affiliationsData,
  licensesData,
  educationData,
  certificationsData,
} from '../../utils/Links';


export default function AboutSection() {

  
  return (
    <div className="flex flex-col gap-6 m-4">
      {/* First Row: Training + Affiliations (compact card) */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <AboutCard
            title="Professional Training"
            items={trainingData}
            className="w-full"
          />
           <AboutCard
            title="Education"
            items={educationData}
            className="w-full my-2"
          />
        </div>
        <div className="w-full md:w-1/3">
          <AboutCard
            title="Professional Affiliations"
            items={affiliationsData}
            className="w-full"
          />
          <AboutCard
            title="Medical Licenses"
            items={licensesData}
            className="w-full my-2"
          />
          <AboutCard
            title="Board Certifications"
            items={certificationsData}
            className="w-full my-2"
          />
        </div>
      </div>
    </div>
  );
}