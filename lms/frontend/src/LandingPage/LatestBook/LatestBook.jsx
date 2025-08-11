import { motion } from "framer-motion";

export default function LatestBook() {
  return (
    <>
      <section className="container-fluid  px-md-4 py-10">
        <div className="row align-items-center p-3 flex-column-reverse flex-lg-row">
          {/* Text Content */}
          <motion.div
            className="col-12 col-lg-7  mt-lg-0 "
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h1 className="display-5 fw-bold mb-3 text-center text-lg-start headingarea">
              The Latest Book<span className="text-warning">.</span>
            </h1>

            <div
              className="mb-4 text-danger fw-bold text-center text-lg-start"
              style={{ fontSize: "1.5rem" }}
            >
              <p className="mb-2 text-lg leading-relaxed break-words">
                Watch Your Back: Nine Proven Strategies to Reduce Your Neck and Back Pain Without Surgery
              </p>
            </div>

            <div
              style={{ fontSize: "1rem" }}
              className="text-center text-lg-start"
            >
              <p className="text-dark mb-3 text-[16px] md:text-[18px]">
                A self-care guide for better back health—and overall well-being—with nine essential strategies to support your neck and spine.
              </p>
              <p className="text-dark mb-3 text-[16px] md:text-[18px]">
                Back problems are the leading cause of disability worldwide, and many of us will endure severe or chronic back pain at some time in our lives. But what can we do? Are surgery and painkillers the only answers? "Not at all," says spine and neck expert Dr. Ken Hansraj. "There are dozens of exercises, habits, and techniques you can practice—anytime, anyplace—that will significantly improve, if not completely heal, your back pain."
              </p>
              <p className="mt-5 text-dark mb-3 text-[16px] md:text-[18px]">
                In <strong>Watch Your Back,</strong> Dr. Hansraj offers a straightforward program for taking the health of your spine and neck into your own hands. Here he offers nine adoptable strategies that provide simple, specific directions on what to do to strengthen your back and make your spine supple.
              </p>
            </div>
          </motion.div>

          {/* Book Image */}
          <motion.div
            className="col-12 col-lg-5  text-center mb-4 mb-lg-0"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src="./book-watch-your-back.png"
              alt="Book by Dr.Ken Hansraj - Watch Your Back"
              title="Click to enlarge"
              className="img-fluid mx-auto cursor-pointer transform transition-transform hover:scale-105"
              style={{ maxWidth: "100%", height: "auto", maxHeight: "500px" }}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
