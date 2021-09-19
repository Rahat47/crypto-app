import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;

    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter(coin =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setCryptos(filteredData);
    }, [cryptosList, searchTerm]);

    if (isFetching) return <div>Loading...</div>;

    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input
                        placeholder="Search Crypto Currency"
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            )}

            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map(crypto => (
                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                        className="crypto-card"
                        key={crypto.id}
                    >
                        <Link to={`/crypto/${crypto.id}`}>
                            <Card
                                hoverable
                                extra={
                                    <img
                                        alt={crypto.name}
                                        className="crypto-image"
                                        src={crypto.iconUrl}
                                    />
                                }
                                title={`${crypto.rank}. ${crypto.name}`}
                            >
                                <p>Price: {millify(crypto.price)} USD</p>

                                <p>Market Cap: {millify(crypto.marketCap)}</p>

                                <p>
                                    Daily Change: {millify(crypto.change) + "%"}
                                </p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Cryptocurrencies;
