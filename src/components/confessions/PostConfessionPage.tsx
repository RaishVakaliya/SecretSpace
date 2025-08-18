import CommonFooter from "../../common/CommonFooter";
import CreateConfession from "./CreateConfession";

const PostConfessionPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#f5f6fa]">
            Share Your Confession
          </h2>
          <p className="text-center text-[#d6dbea] max-w-2xl mx-auto">
            Your confession will be posted anonymously. No one will know it's
            you.
          </p>
        </div>

        <CreateConfession />
      </div>
      <CommonFooter />
    </div>
  );
};

export default PostConfessionPage;
