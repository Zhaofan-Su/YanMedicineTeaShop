// <script>
// 	import './index.css'
// 	export default {
// 		// #ifdef H5
// 		onLaunch: function() {
// 			this.show()
// 			this.$router.beforeEach((to, from, next) => {
// 				this.hide(next)
// 			})
// 			this.$router.afterEach(() => {
// 				// setTimeout(this.show, 50)
// 				this.show()
// 			})
// 		},
// 		methods: {
// 			hide(callback) {
// 				const classList = document.querySelector('uni-page').classList
// 				// classList.add('animation-before', 'animation-leave')
// 				classList.add('animation-leave')
// 				classList.remove('animation-show')
// 				setTimeout(() => {
// 					// classList.remove('animation-before', 'animation-leave')
// 					classList.remove('animation-leave')
// 					callback && callback()
// 				}, 3000)
// 			},
// 			show() {
// 				const classList = document.querySelector('uni-page').classList
// 				// classList.add('animation-before')
// 				setTimeout(() => {
// 					// classList.add('animation-enter', 'animation-after', 'animation-show')
// 					classList.add('animation-enter')
// 					setTimeout(() => {
// 						// classList.remove('animation-before', 'animation-after', 'animation-enter')
// 						classList.remove('animation-enter')
// 					}, 300)
// 				}, 20)
// 					// classList.add('animation-enter', 'animation-after', 'animation-show')
// 					// setTimeout(() => {
// 					// 	classList.remove('animation-before', 'animation-after', 'animation-enter')
// 					// }, 3000)
		
// 			}
// 		},
// 		// #endif
// 	}
// </script>
<script>
	import './index.css'
	export default {
		// #ifdef H5
		onLaunch: function() {
			this.show()
			this.$router.beforeEach((to, from, next) => {
				this.hide(next)
			})
			this.$router.afterEach(() => {
				// setTimeout(this.show, 50)
				this.show()
			})
		},
		methods: {
			hide(callback) {
				const classList = document.querySelector('uni-page').classList
				// classList.add('animation-before', 'animation-leave')  原来代码
				// classList.remove('animation-show')  原来代码
				classList.add('animation-leave')  // 新代码
				setTimeout(() => {
					// classList.remove('animation-before', 'animation-leave')   原来代码
					classList.remove('animation-leave')
					console.log('离开结束')
					callback && callback()
				}, 1000)
			},
			show() {
				const classList = document.querySelector('uni-page').classList
				// classList.add('animation-before')  原来代码
				// setTimeout(() => {   原来代码
					// classList.add('animation-enter', 'animation-after', 'animation-show')  原来代码
					classList.add('animation-enter', 'animation-after')  // 现在代码
					setTimeout(() => {
						// classList.remove('animation-before', 'animation-after', 'animation-enter')   原来代码
						console.log('进入结束')
						classList.remove('animation-enter')  // 现在代码
					}, 1000)
				// }, 20)    原来代码
			}
		},
		// #endif
	}
</script>
