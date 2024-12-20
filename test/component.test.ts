import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Counter from '../src/components/Counter.vue'

describe('counter.vue', () => {
  it('should render', () => {
    const wrapper = mount(Counter, { props: { initial: 10 } })
    expect(wrapper.text()).toContain('10')
  })

  it('should be interactive', async () => {
    const wrapper = mount(Counter, { props: { initial: 0 } })
    expect(wrapper.text()).toContain('0')

    expect(wrapper.find('.inc').exists()).toBe(true)

    await wrapper.get('button').trigger('click')

    expect(wrapper.text()).toContain('1')
  })
})
