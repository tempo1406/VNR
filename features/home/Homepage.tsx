import AnimatedTitle from "./components/AnimatedTitle";
import ScrollDownButton from "@/features/home/components/ScrollDownButton";
import TimelineSection from "./components/TimelineSection";
import { getAllPosts } from "@/features/tai-lieu/data";

const Homepage = () => {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Animated Title */}
      <div className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="max-w-6xl w-full">
          {/* Animated Title */}
          <AnimatedTitle />
        </div>

        {/* Scroll Down Button - Fixed at bottom of hero section */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ScrollDownButton />
        </div>
      </div>

      {/* Timeline Section */}
      <TimelineSection posts={posts} linkPrefix="/tai-lieu" />

      {/* Image Gallery Section */}
      {/* <ImageGallery /> */}

    </div>
  );
};

export default Homepage;
