import React from 'react';
import { message, Table, Button, Popconfirm } from 'antd';
import { get, del } from '../utils/request';
/* eslint-disable no-script-url */
class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: []
    };
  }

  UNSAFE_componentWillMount() {
    get('http://localhost:3000/book')
      .then(res => {
        this.setState({
          bookList: res
        });
      });
  }

  handleEdit(book) {
    this.props.history.push('/bookEdit/' + book.id);
  }

  handleDel(book) {
    /* eslint-disable no-restricted-globals */
    del('http://localhost:3000/book/' + book.id)
      .then(res => {
        this.setState({
          bookList: this.state.bookList.filter(item => item.id !== book.id)
        });
        message.success('删除图书成功');
      })
      .catch(err => {
        console.error(err);
        message.error('删除图书失败');
      });
  }

  render() {
    const { bookList } = this.state;

    const columns = [
      {
        title: '图书ID',
        dataIndex: 'id'
      },
      {
        title: '书名',
        dataIndex: 'name'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (text, record) => <span>&yen;{record.price / 100}</span>
      },
      {
        title: '所有者ID',
        dataIndex: 'owner_id'
      },
      {
        title: '操作',
        render: (text, record) => (
          <div>
            <Button.Group size='small'>
              <Button onClick={() => this.handleEdit(record)}>编辑</Button>
              <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDel(record)}>
                <Button>删除</Button>
              </Popconfirm>
            </Button.Group>
          </div>
        )
      }
    ];

    return (
      <Table columns={columns} dataSource={bookList} rowKey={row => row.id} />
    );
  }
}

export default BookList;