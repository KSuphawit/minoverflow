import RenderTag from "@/components/shared/RenderTag";
import Image from "next/image";
import Link from "next/link";

function RightSidebar() {
  const topQuestions = [
    "Creola Katherine Johnson: mathematician",
    "Mario José Molina-Pasquel Henríquez: chemist",
    "Mohammad Abdus Salam: physicist",
    "Percy Lavon Julian: chemist",
    "Subrahmanyan Chandrasekhar: astrophysicist",
  ];

  const popularTags = [
    {
      _id: "1",
      name: "Javascript",
      numberOfQuestions: 20152,
    },
    {
      _id: "2",
      name: "NEXT.JS",
      numberOfQuestions: 18493,
    },
    {
      _id: "3",
      name: "REACT.JS",
      numberOfQuestions: 16259,
    },
    {
      _id: "4",
      name: "NODE.JS",
      numberOfQuestions: 15121,
    },
    {
      _id: "5",
      name: "PYTHON",
      numberOfQuestions: 14431,
    },
  ];
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <p className="h3-bold text-dark200_light900">Top Question</p>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {topQuestions.map((question) => {
            return (
              <Link
                href="/"
                key={question}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <p className="body-medium text-dark500_light700">{question}</p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="chevron-right"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-16">
        <p className="h3-bold text-dark200_light900">Popular Tags</p>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.numberOfQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
