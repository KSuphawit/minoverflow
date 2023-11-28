import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import { getQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const questions = [
  {
    _id: Math.random().toString(36).substring(7),
    title: `Question Title - ${Math.random().toString(36).substring(7)}`,
    tags: [
      { _id: Math.random().toString(36).substring(7), name: `Tag 1` },
      { _id: Math.random().toString(36).substring(7), name: `Tag 2` },
      { _id: Math.random().toString(36).substring(7), name: `Tag 3` },
    ],
    author: {
      _id: Math.random().toString(36).substring(7),
      name: `Author ${Math.random().toString(36).substring(7)}`,
      picture: `https://picsum.photos/200/200`,
      clerkId: Math.random().toString(36).substring(7),
    },
    upvotes: [
      Math.random().toString(36).substring(7),
      Math.random().toString(36).substring(7),
    ],
    views: Math.floor(Math.random() * 1000),
    answers: [
      {
        answerId: Math.random().toString(36).substring(7),
        content: `Answer content - ${Math.random().toString(36).substring(7)}`,
      },
      {
        answerId: Math.random().toString(36).substring(7),
        content: `Answer content - ${Math.random().toString(36).substring(7)}`,
      },
    ],
    createdAt: new Date(),
    clerkId: Math.random().toString(36).substring(7),
  },
  {
    _id: Math.random().toString(36).substring(7),
    title: `Question Title - ${Math.random().toString(36).substring(7)}`,
    tags: [
      { _id: Math.random().toString(36).substring(7), name: `Tag 1` },
      { _id: Math.random().toString(36).substring(7), name: `Tag 2` },
      { _id: Math.random().toString(36).substring(7), name: `Tag 3` },
    ],
    author: {
      _id: Math.random().toString(36).substring(7),
      name: `Author ${Math.random().toString(36).substring(7)}`,
      picture: `https://picsum.photos/200/200`,
      clerkId: Math.random().toString(36).substring(7),
    },
    upvotes: [
      Math.random().toString(36).substring(7),
      Math.random().toString(36).substring(7),
    ],
    views: Math.floor(Math.random() * 1000),
    answers: [
      {
        answerId: Math.random().toString(36).substring(7),
        content: `Answer content - ${Math.random().toString(36).substring(7)}`,
      },
      {
        answerId: Math.random().toString(36).substring(7),
        content: `Answer content - ${Math.random().toString(36).substring(7)}`,
      },
    ],
    createdAt: new Date(),
    clerkId: Math.random().toString(36).substring(7),
  },
];

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();

  const result = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Questions Here..."
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
