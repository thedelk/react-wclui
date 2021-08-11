import { Card, Col, Row } from 'antd'
import { useState } from 'react'
import Search from './search'
import List from './list'
import Profile from './profile'
import Detail from './detail'

const Main = () => {
  const [report, setReport] = useState({})

  return (
    <div className="body">
      <Row gutter={[8, 8]}>
        <Col span={9}>
          <Card size="small" title="Search">
            <Search setReport={setReport} report={report} />
          </Card>
        </Col>

        <Col span={15}>
          <Card size="small" title="Summary">
            <Profile setReport={setReport} report={report} />
          </Card>
        </Col>

        <Col span={9}>
          <Card size="small" title="Reports">
            <List setReport={setReport} report={report} />
          </Card>
        </Col>

        <Col span={15}>
          <Card size="small" title="Graph">
            <Detail setReport={setReport} report={report} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Main
