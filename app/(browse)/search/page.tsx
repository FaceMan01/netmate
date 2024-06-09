import { redirect } from "next/navigation"
import { Results } from "./_components/results"

interface SearchPageProps {
    searchParams: {
        term?: string
    }
}

const SearchPage = ({
    searchParams
}: SearchPageProps) => {
    if (!searchParams.term) {
        redirect("/")
    }

    return (
        <div className="h-full p-8 mx-auto">
            <Results term={searchParams.term}/>
        </div>
    )
} 

export default SearchPage