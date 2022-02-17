import React, { useEffect } from 'react'
import { Row, Col, Card, Avatar, Input } from 'antd';
import Tile from './Tile';
import { useSelector } from 'react-redux';

function Home() {
    let arruser = useSelector(state => state);
    useEffect(() => { }, [arruser])
    return (
        <div>
            <Row gutter={[16, 16]}>
                {
                    arruser.map((users) => {
                        return (
                            <Col span={6}><Tile id={users.id} avt={users.avt} Sname={users.name} mobilenumber={users.mobilenumber} email={users.email} like={users.like} link={users.link} /></Col>

                        );
                    })
                }
            </Row>

        </div>
    )
}

export default Home