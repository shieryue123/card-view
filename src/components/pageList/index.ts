import pageList from './index.vue'
import pageHeader from './pageListHeader.vue'
import pageTable from './pageTable.vue'
import pageFooter from './pageFooter.vue'

export default vue => {
  vue.component(pageList);
  vue.component(pageHeader);
  vue.component(pageTable);
  vue.component(pageFooter);
}