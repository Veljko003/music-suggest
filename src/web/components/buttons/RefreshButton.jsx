import Icon from "@/web/components/Icon"
import Button from "@/web/components/buttons/Button"

const RefreshButton = ({ refresh }) => (
  <Button
    btnLabel={<Icon icon="refresh" className="h-7 w-8 text-black" />}
    variant="styless"
    onClick={refresh}
  />
)

export default RefreshButton
