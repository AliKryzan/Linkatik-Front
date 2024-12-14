import { Group, Loader as LoaderComponent } from "@mantine/core"

const Loader = (props) => {
  return (
    <Group justify="center" align="center" w={"100%"} h={"100%"} p={"sm"}>
      <LoaderComponent mx={"auto"} color="primary" {...props} />
    </Group>
  )
}

export default Loader
