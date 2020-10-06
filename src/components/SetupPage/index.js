// @flow weak

import React, { useState } from "react"
import ConfigureInterface from "../ConfigureInterface"
import AdvancedOptionsView from "../AdvancedOptionsView"
import { templateMap } from "../StartingPage/templates"
import Box from "@material-ui/core/Box"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import CategoryIcon from "@material-ui/icons/Category"
import BuildIcon from "@material-ui/icons/Build"
import LiveTvIcon from "@material-ui/icons/LiveTv"
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard"
import CodeIcon from "@material-ui/icons/Code"
import BigInterfaceSelect from "../BigInterfaceSelect"
import { setIn } from "seamless-immutable"
import UniversalDataViewer from "../UniversalDataViewer"
import RawJSONEditor from "../RawJSONEditor"
import useInterface from "../../hooks/use-interface"
import useSample from "../../hooks/use-sample"

const noop = () => {}

export default ({ onChange, onClearLabelData }) => {
  const { iface, updateInterface } = useInterface()
  const { sample } = useSample(0)

  const [currentTab, setTab] = useState(iface?.type ? "configure" : "datatype")

  return (
    <div>
      <Box padding="16px">
        <Tabs value={currentTab} onChange={(e, newTab) => setTab(newTab)}>
          <Tab icon={<CategoryIcon />} label="Data Type" value="datatype" />
          <Tab icon={<BuildIcon />} label="Configure" value="configure" />
          <Tab icon={<LiveTvIcon />} label="Preview" value="preview" />
          <Tab icon={<CodeIcon />} label="JSON" value="json" />
          <Tab
            icon={<DeveloperBoardIcon />}
            label="Advanced"
            value="advanced"
          />
        </Tabs>
      </Box>
      {currentTab === "datatype" && (
        <BigInterfaceSelect
          currentInterfaceType={iface?.type}
          onChange={async (newInterface) => {
            await updateInterface(newInterface)
            setTab("configure")
          }}
        />
      )}
      {currentTab === "configure" && (
        <ConfigureInterface
          interface={iface}
          onChange={updateInterface}
          isNotNested
        />
      )}
      {currentTab === "preview" && (
        <UniversalDataViewer
          height={600}
          onExit={noop}
          onSaveTaskOutputItem={noop}
          dataset={{
            interface: iface,
            samples: sample
              ? [sample]
              : [templateMap[iface?.type].dataset.samples[0]],
          }}
        />
      )}
      {currentTab === "advanced" && (
        <AdvancedOptionsView onClearLabelData={onClearLabelData} />
      )}
      {/* {currentTab === "json" && (
        <RawJSONEditor
          content={dataset}
          onSave={(newDataset) => {
            onChange(newDataset)
          }}
        />
      )} */}
    </div>
  )
}
