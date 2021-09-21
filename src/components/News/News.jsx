import {
    Select,
    Typography,
    Row,
    Col,
    Avatar,
    Card,
    Image,
    Divider,
} from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import demoImg from "../../images/th.jpg";
import { useState } from "react";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import Loader from "../Loader/Loader";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

    const { data, isFetching } = useGetCryptosQuery(100);

    const { data: cryptoNews } = useGetCryptoNewsQuery({
        newsCategory: newsCategory,
        count: simplified ? 6 : 12,
    });

    if (!cryptoNews?.value) return <Loader />;

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={value => {
                            setNewsCategory(value);
                        }}
                        filterOption={(input, option) => {
                            return (
                                option.value
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            );
                        }}
                        loading={isFetching}
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins?.map(coin => (
                            <Option key={coin.id} value={coin.name}>
                                {coin.name}{" "}
                            </Option>
                        ))}
                    </Select>
                </Col>
            )}

            {cryptoNews?.value.map((news, i) => (
                <Col key={i} xs={24} sm={12} lg={8}>
                    <Card hoverable className="news-card">
                        <a
                            href={news.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>
                                    {news.name}
                                </Title>

                                <Image
                                    src={
                                        news?.image?.thumbnail?.contentUrl ||
                                        demoImg
                                    }
                                    alt={news.name}
                                    preview={false}
                                    loading="lazy"
                                />
                            </div>

                            <p>
                                {news.description.length > 100
                                    ? `${news.description.substring(0, 100)}...`
                                    : news.description}
                            </p>

                            <Divider />
                            <div className="provider-container">
                                <div>
                                    <Avatar
                                        src={
                                            news.provider[0]?.image?.thumbnail
                                                ?.contentUrl || demoImg
                                        }
                                    />
                                    <Text className="provider-name">
                                        {news.provider[0]?.name}
                                    </Text>
                                </div>
                                <Text>
                                    {moment(news.datePublished)
                                        .startOf("ss")
                                        .fromNow()}
                                </Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default News;
