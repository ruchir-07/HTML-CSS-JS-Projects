gsap.registerPlugin(MorphSVGPlugin)

document.querySelectorAll('.add-to-cart').forEach(button => {
    let morph = button.querySelector('.morph path'),
        shirt = button.querySelectorAll('.shirt svg > path')
    button.addEventListener('pointerdown', e => {
        if(button.classList.contains('active')) {
            return
        }
        gsap.to(button, {
            '--background-scale': .97,
            duration: .15
        })
    })
    button.addEventListener('click', e => {
        e.preventDefault()
        if(button.classList.contains('active')) {
            return
        }
        button.classList.add('active')
        gsap.to(button, {
            keyframes: [{
                '--background-scale': .97,
                duration: .15
            }, {
                '--background-scale': 1,
                delay: .125,
                duration: 1.2,
                ease: 'elastic.out(1, .6)'
            }]
        })
        gsap.to(button, {
            keyframes: [{
                '--shirt-scale': 1,
                '--shirt-y': '-42px',
                '--cart-x': '0px',
                '--cart-scale': 1,
                duration: .4,
                ease: 'power1.in'
            }, {
                '--shirt-y': '-40px',
                duration: .3
            }, {
                '--shirt-y': '16px',
                '--shirt-scale': .9,
                duration: .25,
                ease: 'none'
            }, {
                '--shirt-scale': 0,
                duration: .3,
                ease: 'none'
            }]
        })
        gsap.to(button, {
            '--shirt-second-y': '0px',
            delay: .835,
            duration: .12
        })
        gsap.to(button, {
            keyframes: [{
                '--cart-clip': '12px',
                '--cart-clip-x': '3px',
                delay: .9,
                duration: .06
            }, {
                '--cart-y': '2px',
                duration: .1
            }, {
                '--cart-tick-offset': '0px',
                '--cart-y': '0px',
                duration: .2,
                onComplete() {
                    button.style.overflow = 'hidden'
                }
            }, {
                '--cart-x': '52px',
                '--cart-rotate': '-15deg',
                duration: .2
            }, {
                '--cart-x': '104px',
                '--cart-rotate': '0deg',
                duration: .2,
                clearProps: true,
                onComplete() {
                    button.style.overflow = 'hidden'
                    button.style.setProperty('--text-o', 0)
                    button.style.setProperty('--text-x', '0px')
                    button.style.setProperty('--cart-x', '-104px')
                }
            }, {
                '--text-o': 1,
                '--text-x': '12px',
                '--cart-x': '-48px',
                '--cart-scale': .75,
                duration: .25,
                clearProps: true,
                onComplete() {
                    button.classList.remove('active')
                }
            }]
        })
        gsap.to(button, {
            keyframes: [{
                '--text-o': 0,
                duration: .3
            }]
        })
        gsap.to(morph, {
            keyframes: [{
                morphSVG: 'M0 12C6 12 20 10 32 0C43.9024 9.99999 58 12 64 12V13H0V12Z',
                duration: .25,
                ease: 'power1.out'
            }, {
                morphSVG: 'M0 12C6 12 17 12 32 12C47.9024 12 58 12 64 12V13H0V12Z',
                duration: .15,
                ease: 'none'
            }]
        })
        gsap.to(shirt, {
            keyframes: [{
                morphSVG: 'M4.99997 3L8.99997 1.5C8.99997 1.5 10.6901 3 12 3C13.3098 3 15 1.5 15 1.5L19 3L23.5 8L20.5 11L19 9.5L18 22.5C18 22.5 14 21.5 12 21.5C10 21.5 5.99997 22.5 5.99997 22.5L4.99997 9.5L3.5 11L0.5 8L4.99997 3Z',
                duration: .25,
                delay: .25
            }, {
                morphSVG: 'M4.99997 3L8.99997 1.5C8.99997 1.5 10.6901 3 12 3C13.3098 3 15 1.5 15 1.5L19 3L23.5 8L20.5 11L19 9.5L18.5 22.5C18.5 22.5 13.5 22.5 12 22.5C10.5 22.5 5.5 22.5 5.5 22.5L4.99997 9.5L3.5 11L0.5 8L4.99997 3Z',
                duration: .85,
                ease: 'elastic.out(1, .5)'
            }, {
                morphSVG: 'M4.99997 3L8.99997 1.5C8.99997 1.5 10.6901 3 12 3C13.3098 3 15 1.5 15 1.5L19 3L22.5 8L19.5 10.5L19 9.5L17.1781 18.6093C17.062 19.1901 16.778 19.7249 16.3351 20.1181C15.4265 20.925 13.7133 22.3147 12 23C10.2868 22.3147 8.57355 20.925 7.66487 20.1181C7.22198 19.7249 6.93798 19.1901 6.82183 18.6093L4.99997 9.5L4.5 10.5L1.5 8L4.99997 3Z',
                duration: 0,
                delay: 1.25
            }]
        })
    })
})
