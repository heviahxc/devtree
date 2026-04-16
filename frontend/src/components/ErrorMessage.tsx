
type ErrorMessageProps = {
    children: React.ReactNode;
}
export default function ErrorMessage({children}: ErrorMessageProps){
    return(
       <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2 mt-2">
  {children}
</p>
    )
}