import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs.ui';

const meta: Meta = {
  title: 'Navigation/Tabs',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tabs.Root defaultValue="profile">
      <Tabs.List aria-label="계정 섹션">
        <Tabs.Trigger value="profile">프로필</Tabs.Trigger>
        <Tabs.Trigger value="account">계정</Tabs.Trigger>
        <Tabs.Trigger value="notifications">알림</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="profile">
        <p>프로필 정보를 수정합니다.</p>
      </Tabs.Panel>
      <Tabs.Panel value="account">
        <p>계정 보안 설정을 변경합니다.</p>
      </Tabs.Panel>
      <Tabs.Panel value="notifications">
        <p>알림 설정을 관리합니다.</p>
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs.Root defaultValue="overview" orientation="vertical">
      <Tabs.List aria-label="대시보드">
        <Tabs.Trigger value="overview">개요</Tabs.Trigger>
        <Tabs.Trigger value="analytics">분석</Tabs.Trigger>
        <Tabs.Trigger value="reports">리포트</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="overview">
        <p>주요 지표 요약 화면입니다.</p>
      </Tabs.Panel>
      <Tabs.Panel value="analytics">
        <p>상세 분석 데이터입니다.</p>
      </Tabs.Panel>
      <Tabs.Panel value="reports">
        <p>다운로드 가능한 리포트 목록입니다.</p>
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs.Root defaultValue="a">
      <Tabs.List aria-label="기능">
        <Tabs.Trigger value="a">활성</Tabs.Trigger>
        <Tabs.Trigger value="b" disabled>
          잠김
        </Tabs.Trigger>
        <Tabs.Trigger value="c">활성</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="a">A 패널</Tabs.Panel>
      <Tabs.Panel value="b">B 패널</Tabs.Panel>
      <Tabs.Panel value="c">C 패널</Tabs.Panel>
    </Tabs.Root>
  ),
};
