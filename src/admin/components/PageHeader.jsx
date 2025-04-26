import {
  LeftOutlined,
  ReloadOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Button, Typography } from "antd";

const { Title } = Typography;

export default function PageHeader({
  title,
  onBack,
  searchValue,
  setSearchValue,
  onRefresh,
  onAdd,
  addTitle,
}) {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Button type="text" icon={<LeftOutlined />} onClick={onBack} />
        <Title level={5} className="!mb-0">
          {title}
        </Title>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="search"
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button icon={<ReloadOutlined />} onClick={onRefresh}>
          Refresh
        </Button>
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          {addTitle}
        </Button>
      </div>
    </div>
  );
}
