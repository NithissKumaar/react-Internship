function ActivityTab() {
  return (
    <div className="mt-8">

      <h2 className="text-3xl font-bold">
        Account Activity
      </h2>

      <div className="space-y-4 mt-8">

        <div className="border rounded-xl p-4">
          Logged in today
        </div>

        <div className="border rounded-xl p-4">
          Edited profile yesterday
        </div>

      </div>

    </div>
  );
}

export default ActivityTab;