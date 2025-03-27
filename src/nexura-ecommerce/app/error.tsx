"use client"

// import { useEffect } from "react"
// import Link from "next/link"
// import { AlertTriangle, Home, RefreshCw } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// export default function ErrorPage({
//   error,
//   reset,
// }: {
//   error: Error & { digest?: string }
//   reset: () => void
// }) {
//   // Log the error to an error reporting service
//   useEffect(() => {
//     console.error("Application error:", error)
//   }, [error])

//   return (
//     <div className="container flex items-center justify-center min-h-[80vh]">
//       <Card className="mx-auto max-w-md">
//         <CardHeader className="text-center">
//           <div className="flex justify-center mb-4">
//             <div className="rounded-full bg-amber-100 dark:bg-amber-900/20 p-4">
//               <AlertTriangle className="h-12 w-12 text-amber-600 dark:text-amber-400" />
//             </div>
//           </div>
//           <CardTitle className="text-2xl">Something Went Wrong</CardTitle>
//           <CardDescription>Error 500: We encountered an unexpected error</CardDescription>
//         </CardHeader>
//         <CardContent className="text-center space-y-4">
//           <p>
//             We're sorry, but something went wrong on our end. Our team has been notified and is working to fix the
//             issue.
//           </p>
//           <p className="text-sm text-muted-foreground">You can try refreshing the page or come back later.</p>
//           {error.digest && <p className="text-xs text-muted-foreground mt-4">Error ID: {error.digest}</p>}
//         </CardContent>
//         <CardFooter className="flex flex-col sm:flex-row gap-2 justify-center">
//           <Button variant="outline" onClick={reset} className="w-full sm:w-auto">
//             <RefreshCw className="mr-2 h-4 w-4" />
//             Try Again
//           </Button>
//           <Button asChild className="w-full sm:w-auto">
//             <Link href="/">
//               <Home className="mr-2 h-4 w-4" />
//               Return Home
//             </Link>
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

