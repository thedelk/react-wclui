import axios from 'api/axios'
import { Button, Form, Input, Select } from 'antd'
import { qWorldData, qCharacterData } from 'api/queries'
import { useEffect, useState } from 'react'

const SearchView = props => {
  const [region, setRegion] = useState(``)
  const [regions, setRegions] = useState(``)
  const [character, setCharacter] = useState(``)
  const { setReport } = props
  const [form] = Form.useForm()

  // Fetch form details on mount so characters can be searched
  useEffect(() => initSearch())

  // TODO: Additionally check localStorage for the
  // existence of the "regions" dataset
  const initSearch = async () => {
    if (!regions?.length) {
      const { data } = await axios({ data: { query: qWorldData } })
      setRegions(data.data.worldData.regions)
      localStorage.setItem(
        `regions`,
        JSON.stringify(data.data.worldData.regions)
      )
    }
  }

  // Update form data when leaving text field (instead of on type)
  const onBlur = event => setCharacter(event.target.value)

  // Pressing the search button
  const onFinish = async values => {
    const { data } = await axios({
      data: { query: qCharacterData, variables: values }
    })
    setReport(data.data.characterData.character.recentReports)
  }

  // When the region changes, the server dropdown needs updated
  // with the corresponding list of appropriate servers
  const onRegionChange = value => {
    setRegion(regions.find(item => item.value === value))
    form.setFieldsValue({ server: undefined })
  }

  if (!regions.length) return null

  return (
    <Form form={form} name="search" onFinish={onFinish}>
      <Input.Group compact style={{ display: `flex` }}>
        <Form.Item name="region" style={{ flex: `0 0 50px` }}>
          <Select
            dropdownMatchSelectWidth={false}
            onChange={onRegionChange}
            optionLabelProp="value"
            options={regions}
            placeholder="Region"
            style={{ minWidth: 50 }}
          />
        </Form.Item>

        <Form.Item name="server" style={{ flex: 1 }}>
          <Select
            options={region?.children?.data}
            placeholder="Server"
            showSearch
            style={{ width: `100%` }}
          />
        </Form.Item>
      </Input.Group>

      <Form.Item name="character">
        <Input placeholder="Character" onChange={onBlur} />
      </Form.Item>

      <Form.Item style={{ textAlign: `right` }}>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SearchView
