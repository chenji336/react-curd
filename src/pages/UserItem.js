import React from 'react';
/* eslint-disable no-script-url */ // 防止javascript：void(0)
class UserItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: []
        }
        console.log('props',props);
    }

    UNSAFE_componentWillMount() {
        fetch('http://localhost:3000/user')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    userList: res
                });
            })
    }

    handleDel (user) {
        /* eslint-disable no-restricted-globals */
        const confirmed = confirm(`确定要删除用户 ${user.name} 吗？`); // js自带的confirm函数
    
        if (confirmed) {
          fetch('http://localhost:3000/user/' + user.id, {
            method: 'delete'
          })
            .then(res => res.json())
            .then(res => {
              this.setState({
                userList: this.state.userList.filter(item => item.id !== user.id)
              });
              alert('删除用户成功');
            })
            .catch(err => {
              console.error(err);
              alert('删除用户失败');
            });
        }
      }

    render() {
        const { userList } = this.state;
        return (
            <table>
                <thead>
                    <tr>
                        <th>用户ID</th>
                        <th>用户名</th>
                        <th>性别</th>
                        <th>年龄</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userList.map((user) => {
                            console.log(user);
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <a href='javascript:void(0)' onClick={() => this.handleEdit(user)}>编辑</a>
                                        &nbsp;
                                        <a href='javascript:void(0)' onClick={() => this.handleDel(user)}>删除</a>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    }
}

export default UserItem;