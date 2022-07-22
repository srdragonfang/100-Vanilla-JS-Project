const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const todolist = $('.todolist');

const all_status = $('.status');

const app = {
	todoData: [
		{
			title: 'Completed Thien Yet Ai Tam',
			date: '',
			description:
				'Hoan thanh chuong truyen cuoi cung va tong hop lai loi chinh ta',
			status: 'progress',
		},
		{
			title: 'Di sai gon',
			date: '',
			description: 'Xay dung ke hoach di sai gon',
		},
		{
			title: 'Di sai gon 2',
			date: '',
			description: 'Xay dung ke hoach di sai gon',
		},
		{
			title: 'Di sai gon 3',
			date: '',
			description: 'Xay dung ke hoach di sai gon',
		},
	],

	render: function () {
		const htmls = this.todoData.map((todo, index) => {
			return `
      <div class="todo" data-index="${index}" draggable="true">
        <p class="todo-item">${todo.title}</p>
        <div class="todo-btn">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <div class="todo-tools">
          <div class="todo-tool chapterCl" id="chapter">Chapter</div>
          <div class="todo-tool sceneCl" id="scene">Scene</div>
          <div class="todo-tool importCl" id="import">Important</div>
          <div class="todo-tool" id="delete">Delete</div>
        </div>
      </div>
      `;
		});
		todolist.innerHTML = htmls.join('');
	},

	start: function () {
		this.render();
	},
};
app.start();
