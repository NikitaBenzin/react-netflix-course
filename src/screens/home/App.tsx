import { useMemo, useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { useTheme } from '../../hooks/useTheme'
import MovieCard from './MovieCard'
import { MOVIES } from './movies.data'

function App() {
	const { theme, toggleTheme } = useTheme()

	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const movies = useMemo(() => {
		return MOVIES.filter(movie =>
			movie.name.toLowerCase().includes(debouncedSearch.toLowerCase())
		)
	}, [debouncedSearch])

	return (
		<div className="min-h-screen w-full dark:bg-black dark:text-white bg-white text-black px-6 py-5">
			<header className="mb-10 flex items-center justify-between">
				<img src="/netflix.png" alt="Netflix" className="h-8 w-auto" />

				<div className="flex gap-1">
					<input
						type="search"
						value={searchTerm}
						onChange={e => {
							setSearchTerm(e.target.value)
						}}
						placeholder="Search..."
						className="border dark:border-white/15 px-1 rounded outline-0"
					/>

					<button
						onClick={toggleTheme}
						className="text-sm px-3 py-0.5 rounded border border-black dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition w-20"
					>
						{theme === 'dark' ? 'Light' : 'Dark'}
					</button>
				</div>
			</header>
			<main className="flex gap-6">
				{movies.length ? (
					movies.map(movie => <MovieCard key={movie.name} movie={movie} />)
				) : (
					<p>Movies not found!</p>
				)}
			</main>
		</div>
	)
}

export default App
