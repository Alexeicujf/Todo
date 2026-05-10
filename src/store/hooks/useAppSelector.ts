import type { RootState } from ".."
import { useSelector } from "react-redux"

export const useAppSelector =  useSelector.withTypes<RootState>()
