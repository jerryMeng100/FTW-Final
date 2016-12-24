class PostsWrapper extends React.Component {
  constructor(props){
    super(props);
    console.log("PostWrapper Called");
    apiLoadMore = this;

    this.state = {
      posts: props.posts
    };
  }
  loadMore(){
    let posts = this.state.posts;
    let lastPost = posts[posts.length - 1];

    $.ajax({
      url: this.paginationURL(),
      data: { page: lastPost.id },
      type: 'GET',
      dataType: 'json',
      success: (response) => {
        this.setState({
          posts: this.state.posts.concat(response.posts)
        })
      }
    })
    console.log("success");
  }

  paginationURL(){
    let section = this.props.section;
    let type = this.props.type;

    if(section && type){
      return `/${section}/${type}`
    }

    return '/hot'
  }

  render() {
    return (
      <div>

        {/*this block of code spawns the posts*/}
        {this.state.posts.map((post) => {
          return (<Post post={post} key={post.id}></Post>);
        })}
        {this.loadMore.bind(this)}


        <div className="load-more">
          <a className="btn btn-primary btn-block" onClick={this.loadMore.bind(this)}>Load more</a>
        </div>
      </div>
    );
  }

  //
  test(){
    alert("LKAJSLDKJ");
    console.log("LSKDJFLKSDJF");
  }
  //

}

PostsWrapper.defaultProps = {
  section: 'hot'
}

PostsWrapper.propTypes = {
  posts: React.PropTypes.array.isRequired,
  section: React.PropTypes.string,
  type: React.PropTypes.string
};
